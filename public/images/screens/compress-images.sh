#!/bin/bash

# Default settings
QUALITY=82
OUTPUT_DIR="webp"
PATTERN="*.jpg"

# Check if webp tools are installed
check_dependencies() {
    if ! command -v cwebp &> /dev/null; then
        echo "WebP tools are not installed. Installing..."
        if command -v apt &> /dev/null; then
            sudo apt update && sudo apt install -y webp
        elif command -v dnf &> /dev/null; then
            sudo dnf install -y libwebp-tools
        elif command -v pacman &> /dev/null; then
            sudo pacman -S libwebp
        else
            echo "Please install WebP tools manually for your distribution"
            exit 1
        fi
    fi
}

# Print size in human-readable format
human_size() {
    local bytes=$1
    if ((bytes < 1024)); then
        echo "${bytes}B"
    elif ((bytes < 1048576)); then
        echo "$(( (bytes + 512) / 1024 ))KB"
    else
        echo "$(( (bytes + 524288) / 1048576 ))MB"
    fi
}

# Calculate compression percentage
calc_compression() {
    local original=$1
    local compressed=$2
    local saving=$(( 100 - (compressed * 100 / original) ))
    echo $saving
}

# Convert single image
convert_image() {
    local input_file="$1"
    local output_file="$OUTPUT_DIR/${input_file%.*}.webp"
    local original_size=$(stat -f%z "$input_file" 2>/dev/null || stat -c%s "$input_file")
    
    echo "Converting: $input_file"
    
    # Convert using cwebp
    cwebp -q "$QUALITY" "$input_file" -o "$output_file" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        local compressed_size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file")
        local saving=$(calc_compression $original_size $compressed_size)
        echo "  Original size (JPG): $(human_size $original_size)"
        echo "  WebP size: $(human_size $compressed_size)"
        echo "  Space saved: $saving%"
        echo "  Saved to: $output_file"
        return 0
    else
        echo "  Failed to convert $input_file"
        return 1
    fi
}

# Print usage information
print_usage() {
    echo "Usage: $0 [-q quality] [-p pattern] [-o output_dir]"
    echo "  -q: WebP quality (1-100, default: $QUALITY)"
    echo "  -p: File pattern (default: $PATTERN)"
    echo "  -o: Output directory (default: $OUTPUT_DIR)"
    echo "  -h: Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                                      # Convert all JPGs in current directory"
    echo "  $0 -q 85                               # Convert with quality 85"
    echo "  $0 -p \"french-dandy-cover-*.jpg\"       # Convert specific files"
    echo "  $0 -o webp_converted                   # Output to custom directory"
}

# Main script
main() {
    local total_original_size=0
    local total_compressed_size=0
    local processed=0
    local failed=0
    
    # Parse command line options
    while getopts "q:p:o:h" opt; do
        case $opt in
            q) QUALITY="$OPTARG"
               if ! [[ "$QUALITY" =~ ^[0-9]+$ ]] || [ "$QUALITY" -lt 1 ] || [ "$QUALITY" -gt 100 ]; then
                   echo "Error: Quality must be between 1 and 100"
                   exit 1
               fi
               ;;
            p) PATTERN="$OPTARG"
               ;;
            o) OUTPUT_DIR="$OPTARG"
               ;;
            h) print_usage
               exit 0
               ;;
            \?) print_usage
                exit 1
                ;;
        esac
    done
    
    check_dependencies
    
    # Create output directory
    mkdir -p "$OUTPUT_DIR"
    
    echo "Starting conversion with:"
    echo "  Quality: $QUALITY"
    echo "  Pattern: $PATTERN"
    echo "  Output directory: $OUTPUT_DIR"
    echo ""
    
    # Process all matching files
    for file in $PATTERN; do
        if [ -f "$file" ]; then
            local original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
            total_original_size=$((total_original_size + original_size))
            
            convert_image "$file"
            
            if [ $? -eq 0 ]; then
                local output_file="$OUTPUT_DIR/${file%.*}.webp"
                local compressed_size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file")
                total_compressed_size=$((total_compressed_size + compressed_size))
                ((processed++))
            else
                ((failed++))
            fi
        fi
    done
    
    # Print summary
    echo ""
    echo "Conversion complete!"
    echo "Files processed: $processed"
    if [ $failed -gt 0 ]; then
        echo "Files failed: $failed"
    fi
    echo "Total original size: $(human_size $total_original_size)"
    echo "Total WebP size: $(human_size $total_compressed_size)"
    echo "Total space saved: $(calc_compression $total_original_size $total_compressed_size)%"
}

main "$@"