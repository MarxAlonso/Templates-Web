
$ciberDir = "c:\Users\GamingWorld\OneDrive\Desktop\hispano tesis peru\Templates-Web\templates-asesorias\asesorias-nextjs\public\imagenes\cibertesis"
Get-ChildItem $ciberDir | ForEach-Object {
    if ($_.Name -like "*Coherencia*") { Rename-Item $_.FullName "ciber-metodologia.jfif" -ErrorAction SilentlyContinue }
    if ($_.Name -like "*[H1]*") { Rename-Item $_.FullName "ciber-hero.jfif" -ErrorAction SilentlyContinue }
}
