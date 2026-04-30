
$ucvDir = "c:\Users\GamingWorld\OneDrive\Desktop\hispano tesis peru\Templates-Web\templates-asesorias\asesorias-nextjs\public\imagenes\ucv"
$ciberDir = "c:\Users\GamingWorld\OneDrive\Desktop\hispano tesis peru\Templates-Web\templates-asesorias\asesorias-nextjs\public\imagenes\cibertesis"

# UCV Reanmes
Get-ChildItem -Path $ucvDir -Filter "*[H1] Tesis CESAR VALLEJO*" | Rename-Item -NewName "ucv-hero.jfif"
Get-ChildItem -Path $ucvDir -Filter "*Los desafíos clave*" | Rename-Item -NewName "ucv-desafios.jfif"
Get-ChildItem -Path $ucvDir -Filter "*Dominando el Turnitin*" | Rename-Item -NewName "ucv-turnitin.jfif"
Get-ChildItem -Path $ucvDir -Filter "*Formato APA*" | Rename-Item -NewName "ucv-apa.jfif"
Get-ChildItem -Path $ucvDir -Filter "1.-que-hago-si-mi-asesor*" | Rename-Item -NewName "ucv-faq1.jfif"
Get-ChildItem -Path $ucvDir -Filter "2.-es-muy-dificil*" | Rename-Item -NewName "ucv-faq2.png"
Get-ChildItem -Path $ucvDir -Filter "3.-la-asesoria-incluye-apoyo*" | Rename-Item -NewName "ucv-faq3.png"
Get-ChildItem -Path $ucvDir -Filter "4.-cuando-es-el-mejor-momento*" | Rename-Item -NewName "ucv-faq4.png"
Get-ChildItem -Path $ucvDir -Filter "5.-mi-tesis-publicada-en-el-repositorio*" | Rename-Item -NewName "ucv-faq5.png"

# Cibertesis Renames
Get-ChildItem -Path $ciberDir -Filter "*Coherencia y consistencia metodológica*" | Rename-Item -NewName "ciber-metodologia.jfif"
Get-ChildItem -Path $ciberDir -Filter "*Los tres pilares*" | Rename-Item -NewName "ciber-pilares.jfif"
Get-ChildItem -Path $ciberDir -Filter "*La batalla contra el software de similitud*" | Rename-Item -NewName "ciber-turnitin.jfif"
