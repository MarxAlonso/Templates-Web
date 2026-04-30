
$pucpDir = "c:\Users\GamingWorld\OneDrive\Desktop\hispano tesis peru\Templates-Web\templates-asesorias\asesorias-nextjs\public\imagenes\pucp"

Get-ChildItem $pucpDir | ForEach-Object {
    if ($_.Name -like "1.-cual-es-el-error*") { Rename-Item $_.FullName "pucp-faq1.jfif" }
    if ($_.Name -like "2.-como-puedo-acceder*") { Rename-Item $_.FullName "pucp-faq2.jfif" }
    if ($_.Name -like "3.-que-tan-importante*") { Rename-Item $_.FullName "pucp-faq3.jfif" }
    if ($_.Name -like "4.-cuanto-tiempo-suele*") { Rename-Item $_.FullName "pucp-faq4.jfif" }
    if ($_.Name -like "5.-que-pasa-si-mi-tesis*") { Rename-Item $_.FullName "pucp-faq5.jfif" }
}
