$Source = "C:\Users\DELL\OneDrive\Desktop\glc-ccs-main\glc-ccs-main"
$Destination = "$env:TEMP\glc-deploy"

if (Test-Path $Destination) {
    Remove-Item -Recurse -Force $Destination
}

robocopy $Source $Destination /MIR /XD node_modules .git .vercel /XF deploy.ps1

Set-Location $Destination
npx vercel --prod --yes
