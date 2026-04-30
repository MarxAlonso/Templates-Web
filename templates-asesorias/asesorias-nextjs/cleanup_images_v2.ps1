
$ucvDir = "c:\Users\GamingWorld\OneDrive\Desktop\hispano tesis peru\Templates-Web\templates-asesorias\asesorias-nextjs\public\imagenes\ucv"
Get-ChildItem $ucvDir | ForEach-Object {
    if ($_.Name -notlike "ucv-*") {
        Write-Host "Deleting UCV: $($_.Name)"
        Remove-Item $_.FullName -Force -Recurse
    }
}

$ciberDir = "c:\Users\GamingWorld\OneDrive\Desktop\hispano tesis peru\Templates-Web\templates-asesorias\asesorias-nextjs\public\imagenes\cibertesis"
Get-ChildItem $ciberDir | ForEach-Object {
    if ($_.Name -notlike "ciber-*") {
        Write-Host "Deleting Ciber: $($_.Name)"
        Remove-Item $_.FullName -Force -Recurse
    }
}
