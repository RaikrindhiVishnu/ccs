import os
import re

directories = [
    r"src/features/io/components",
    r"src/features/io/pages"
]

clamp_regex = re.compile(r"text-\[clamp\(\s*(-?[0-9.]+)(rem|px)\s*,\s*(-?[0-9.]+)vw\s*,\s*(-?[0-9.]+)(rem|px)\s*\)\]", re.IGNORECASE)

results = []

for directory in directories:
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith((".tsx", ".ts")):
                file_path = os.path.join(root, file)
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                    for match in clamp_regex.finditer(content):
                        min_val = float(match.group(1))
                        unit1 = match.group(2)
                        vw = float(match.group(3))
                        max_val = float(match.group(4))
                        unit2 = match.group(5)
                        
                        min_px = min_val * 16 if unit1 == "rem" else min_val
                        max_px = max_val * 16 if unit2 == "rem" else max_val
                        
                        val_1440 = vw * 14.40
                        val_1920 = vw * 19.20
                        
                        # Only show large fonts (e.g., max_px > 24)
                        if max_px >= 20:
                            results.append({
                                'file': os.path.basename(file),
                                'clamp': match.group(0),
                                'min_px': min_px,
                                'max_px': max_px,
                                'val_1440': val_1440,
                                'val_1920': val_1920,
                                'caps_at': (max_px / vw * 100) if vw > 0 else 0
                            })

results.sort(key=lambda x: x['max_px'], reverse=True)
for r in results:
    print(f"{r['file']}: {r['clamp']} -> 1440px: {r['val_1440']:.1f}px, 1920px: {r['val_1920']:.1f}px (caps at {r['caps_at']:.0f}px)")
