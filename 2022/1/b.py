# 1. Get everything until I reach a newline
# 2. Add everything that I've read and place into variable.
# 3. Place everything into array.
# 4. At very end loop through array and find 3 biggest.

rations = []
current = 0

with open("./1/sample.txt", "r") as file:
    for line in file:
        stripped = line.strip()
        if (stripped == ""):
            rations.append(current)
            current = 0
        else:
            current += int(stripped)

rations.sort(reverse=True)
print(rations[0] + rations[1] + rations[2])
