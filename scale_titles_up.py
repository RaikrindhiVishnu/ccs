import os
import re

directories = [
    r"src/features/io/components",
    r"src/features/io/pages"
]

clamp_regex = re.compile(r"(text-\[clamp\(\s*-?[0-9.]+(?:rem|px)\s*,\s*)(-?[0-9.]+)vw(\s*,\s*)(-?[0-9.]+)(rem|px)(\s*\)\])", re.IGNORECASE)

def process_match(match):
    prefix = match.group(1)
    vw = float(match.group(2))
    comma = match.group(3)
    max_val = float(match.group(4))
    unit = match.group(5)
    suffix = match.group(6)
    
    max_px = max_val * 16 if unit == "rem" else max_val
    
    # Identify "title" fonts (e.g. max_val >= 24px or vw >= 1.5)
    if max_px >= 24 or vw >= 1.5:
        # Calculate what the value would be at 1920px
        val_1920_px = vw * 19.20
        if unit == "rem":
            val_1920 = val_1920_px / 16.0
        else:
            val_1920 = val_1920_px
            
        # If the current max caps it before 1920px, increase it
        if val_1920 > max_val:
            new_max = round(val_1920, 4)
            # Remove trailing zeros
            new_max_str = f"{new_max:g}"
            return f"{prefix}{vw:g}vw{comma}{new_max_str}{unit}{suffix}"
            
    return match.group(0)

def process_file(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    new_content = clamp_regex.sub(process_match, content)
    
    if content != new_content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated: {file_path}")

def main():
    for directory in directories:
        for root, dirs, files in os.walk(directory):
            for file in files:
                if file.endswith((".tsx", ".ts")):
                    process_file(os.path.join(root, file))
                    
if __name__ == "__main__":
    main()
