import os
import re

directories = [
    r"src/features/io/components",
    r"src/features/io/pages"
]

clamp_regex = re.compile(r"clamp\(\s*(-?[0-9.]+)(rem|px)\s*,\s*(-?[0-9.]+)vw\s*,\s*(-?[0-9.]+)(rem|px)\s*\)", re.IGNORECASE)

def process_match(match):
    val1 = float(match.group(1))
    unit1 = match.group(2)
    vw = float(match.group(3))
    val2 = float(match.group(4))
    unit2 = match.group(5)
    
    # Calculate exact value at 1024px
    val_1024_px = vw * 1024 / 100
    if unit1 == "rem":
        val_1024_units = val_1024_px / 16.0
    else:
        val_1024_units = val_1024_px
        
    if val2 > 0 and val1 >= 0:
        # Positive clamp
        actual_1024 = max(val1, min(val_1024_units, val2))
        new_min = round(actual_1024 * 0.75, 4)
        new_min_str = f"{new_min:g}"
        # NO spaces between arguments! Tailwind CSS arbitrary values break if there are spaces.
        return f"clamp({new_min_str}{unit1},{vw}vw,{val2}{unit2})"
    elif val2 < 0 and val1 < 0:
        # Negative clamp
        actual_1024 = min(val1, max(val_1024_units, val2))
        new_max = round(actual_1024 * 0.75, 4)
        new_max_str = f"{new_max:g}"
        # NO spaces between arguments!
        return f"clamp({val1}{unit1},{vw}vw,{new_max_str}{unit2})"
    else:
        # Format existing properly with NO spaces just in case
        return f"clamp({val1:g}{unit1},{vw:g}vw,{val2:g}{unit2})"

def process_file(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    new_content = clamp_regex.sub(process_match, content)
    
    # Replace lg: with md: for responsive layout breaks
    new_content = new_content.replace("lg:grid-cols-2", "md:grid-cols-2")
    new_content = new_content.replace("lg:grid-cols-3", "md:grid-cols-3")
    new_content = new_content.replace("lg:grid-cols-4", "md:grid-cols-4")
    new_content = new_content.replace("lg:flex-row", "md:flex-row")
    new_content = new_content.replace("lg:w-", "md:w-")
    new_content = new_content.replace("lg:h-", "md:h-")
    new_content = new_content.replace("lg:gap-", "md:gap-")
    new_content = new_content.replace("lg:p-", "md:p-")
    new_content = new_content.replace("lg:px-", "md:px-")
    new_content = new_content.replace("lg:py-", "md:py-")
    new_content = new_content.replace("lg:block", "md:block")
    new_content = new_content.replace("lg:hidden", "md:hidden")
    new_content = new_content.replace("lg:flex", "md:flex")
    new_content = new_content.replace("lg:col-span-", "md:col-span-")
    
    if content != new_content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated: {file_path}")

def main():
    if not os.path.exists("src"):
        print("Please run from the GLC-UI root directory")
        return
        
    for directory in directories:
        for root, dirs, files in os.walk(directory):
            for file in files:
                if file.endswith((".tsx", ".ts")):
                    process_file(os.path.join(root, file))
                    
if __name__ == "__main__":
    main()
