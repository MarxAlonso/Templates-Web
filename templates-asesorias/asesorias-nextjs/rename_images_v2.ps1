
$dir = "c:\Users\GamingWorld\OneDrive\Desktop\hispano tesis peru\Templates-Web\templates-asesorias\asesorias-nextjs\public\imagenes\ucv"
Get-ChildItem $dir | ForEach-Object {
    $newName = $_.Name
    if ($newName -like "*[H1] Tesis CESAR VALLEJO*") { Rename-Item $_.FullName "ucv-hero.jfif" -ErrorAction SilentlyContinue }
    if ($newName -like "*Los desafíos clave*") { Rename-Item $_.FullName "ucv-desafios.jfif" -ErrorAction SilentlyContinue }
    if ($newName -like "*Dominando el Turnitin*") { Rename-Item $_.FullName "ucv-turnitin.jfif" -ErrorAction SilentlyContinue }
    if ($newName -like "*Formato APA*") { Rename-Item $_.FullName "ucv-apa.jfif" -ErrorAction SilentlyContinue }
    if ($newName -like "1.-que-hago-si-mi-asesor*") { Rename-Item $_.FullName "ucv-faq1.jfif" -ErrorAction SilentlyContinue }
}

$ciberDir = "c:\Users\GamingWorld\OneDrive\Desktop\hispano tesis peru\Templates-Web\templates-asesorias\asesorias-nextjs\public\imagenes\cibertesis"
Get-ChildItem $ciberDir | ForEach-Object {
    $newName = $_.Name
    if ($newName -like "*Coherencia y consistencia metodológica*") { Rename-Item $_.FullName "ciber-metodologia.jfif" -ErrorAction SilentlyContinue }
    if ($newName -like "*Los tres pilares*") { Rename-Item $_.FullName "ciber-pilares.jfif" -ErrorAction SilentlyContinue }
    if ($newName -like "*La batalla contra el software de similitud*") { Rename-Item $_.FullName "ciber-turnitin.jfif" -ErrorAction SilentlyContinue }
}
