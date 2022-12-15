f = open("./1/input-a.txt", "r")

# 1. Get everything until I reach a newline
# 2. Add everything that I've read and place into variable.
# 3. Only place into variable if it is larger than current value.

biggest = 0
current = 0

for line in f:
    stripped = line.strip()
    if (stripped == "" and current > biggest):
        biggest = current
        current = 0
    elif (stripped == ""):
        current = 0
    else:
        current += int(stripped)

print(biggest)
