# Script de validación para el entorno de desarrollo
Write-Host "Iniciando proceso de validación..." -ForegroundColor Cyan

# 1. Ejecutar el build
Write-Host "Ejecutando pnpm build..." -ForegroundColor Yellow
pnpm build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build exitoso! No se encontraron errores." -ForegroundColor Green
    Write-Host "Puedes realizar el push: git push" -ForegroundColor Cyan
    exit 0
} else {
    Write-Host "Error en el build. Revisa los logs arriba." -ForegroundColor Red
    exit 1
}
