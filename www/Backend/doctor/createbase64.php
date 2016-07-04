<?php


// A few settings
$img_file = 'out.jpg';

// Read image path, convert to base64 encoding
$imgData = base64_encode($img_file);

// Format the image SRC:  data:{mime};base64,{data};
$src = 'data: '.mime_content_type($img_file).';base64,'.$imgData;

// Echo out a sample image
echo '<img src="'.$src.'">';











?>
