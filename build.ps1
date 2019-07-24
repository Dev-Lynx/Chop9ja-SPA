[string]$destinationDirectory = "C:\Users\princ\source\repos\Chop9ja\Chop9ja.API\wwwroot"
$sourceDirectory = "C:\Users\princ\source\repos\Chop9ja\Chop9ja-SPA\build"
Copy-item -Recurse -Verbose $sourceDirectory -Destination $destinationDirectory
