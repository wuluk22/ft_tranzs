#!/bin/bash

set -e # Stop this script if a command fails

echo "Launch start.sh"

if [ "$MODE" = "development" ]; then
	sed -i 's|./dist/|./src/|g' index.html
	sed -i 's|/src/\(.*\)\.js|/src/\1.ts|g' index.html
	echo "Starting in development mode..."
	exec npm run dev
else
	echo "Starting production: copying /dist to /build"

	FILES=("dist" "views" "img" "index.html")

	mkdir -p build

	# Copy each file (if exists)
	for item in "${FILES[@]}"; do
		if [ -e "$item" ]; then
			echo "Copy of $item in /build/"
			cp -r "$item" build/
		else
			echo "$item not found."
		fi
	done
	echo "Done."
fi

# Keep frontend container alive in prod (facultative)
exec tail -f /dev/null