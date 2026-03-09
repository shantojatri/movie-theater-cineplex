import re
import sys

def extract_body(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    match = re.search(r'<body[^>]*>(.*?)</body>', content, re.DOTALL | re.IGNORECASE)
    if match:
        body_content = match.group(1).strip()
        with open('temp.vue', 'w') as f:
            f.write(f'<template>\n{body_content}\n</template>')
    else:
        print("No body found")

if __name__ == "__main__":
    extract_body(sys.argv[1])
