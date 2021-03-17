#From powershell terminal (VSCode or just Powershell): .\deployAndSeedDb.ps1
#From github bash: powershell.exe ./deployAndSeedDb.ps1
npx sequelize-cli db:migrate:undo:all ; npx sequelize-cli db:migrate ; npx sequelize-cli db:seed:all