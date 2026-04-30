
$dirs = @(
    "c:\Users\GamingWorld\OneDrive\Desktop\hispano tesis peru\Templates-Web\templates-asesorias\asesorias-nextjs\public\imagenes\ucv",
    "c:\Users\GamingWorld\OneDrive\Desktop\hispano tesis peru\Templates-Web\templates-asesorias\asesorias-nextjs\public\imagenes\cibertesis"
)

foreach ($dir in $dirs) {
    Get-ChildItem $dir | ForEach-Object {
        $name = $_.Name
        if ($name.Length -gt 40 -or $name -match "[#\[\]¿\? ]") {
            if ($name -notmatch "^(ucv-|ciber-)") {
                Write-Host "Deleting: $name"
                Remove-Item $_.FullName -Force
            }
        }
    }
}
