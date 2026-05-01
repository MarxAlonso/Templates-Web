
NIVEL DE PRUEBA 

OBJETIVO TÉCNICO 

COMPONENTES AFECTADOS 

PRUEBAS UNITARIAS 

Validar la lógica de negocio en aislamiento utilizando mocks (Mockito) para evitar dependencias externas. 

Services, Entities, DTOs 

PRUEBAS DE INTEGRACIÓN 

Verificar la comunicación entre componentes (JPA → MySQL) y la correcta persistencia de datos. 

Repositories, Persistence Layer 

PRUEBAS FUNCIONALES (API) 

Validar los flujos completos del sistema, incluyendo autenticación y control de acceso. 

Endpoints REST, Seguridad (JWT, RBAC) 

PRUEBAS DE USABILIDAD (UI) 

Evaluar la interacción del usuario y la correcta visualización de la información en la interfaz. 

Vistas HTML, Bootstrap, JavaScript 

AUTOMATIZACIÓN (CI/CD) 

Ejecutar automáticamente la suite de pruebas y validar la integración continua del sistema. 

GitHub Actions, Pipeline, Build 

estructura del proyecto 

.mvn
src
main
java/com/example/clinicalolimsa
controllers
Gerentes
GerenteAlmacenController.java
GerenteCitasController.java
GerenteComprasController.java
GerenteMedicamentosController.java
GerenteMedicosController.java
GerentePacientesControlller.java
GerentePanelController.java
GerenteProveedorController.java
GerenteTipoMedicamentoController.java
Medicos
MedicoCitasController.java
MedicoExamenArterialController.java
MedicoExamenSangreController.java
MedicoHistorialClinicoController.java
MedicoPacienteController.java
MedicosPanelController.java
Pacientes
PacienteComprasController.java
PacienteMedicamentosController.java
PacientesPanelController.java
AccountController.java
AccountController.java~
InicioController.java
jwt
AuthController.java
JwtAuthenticationFilter.java
JwtUtil.java
models
Almacen.java
AppUser.java
Citas.java
Compra.java
ExamenArterial.java
ExamenSangre.java
HistorialClinico.java
Medicamentos.java
Medicos.java
Paciente.java
Proveedor.java
RegisterDto.java
RegisterPacienteDto.java
TipoDeMedicamento.java
repositories
AlmacenRepository.java
AppUserRepository.java
CitasRepository.java
CompraRepository.java
ExamenArterialRepository.java
ExamenSangreRepository.java
HistorialClinicoRepository.java
MedicamentosRepository.java
MedicosRepository.java
PacienteRepository.java
ProveedorRepository.java
TipoDeMedicamentoRepository.java
security
CustomSuccessHandler.java
CustomUserDetailsService.java
MedicoUserDetails.java
PacienteUserDetails.java
SecurityConfig.java
WebConfig.java
ClinicalolimsaApplication.java
resources
static
templates
gerente
medicos
pacientes
index.html
login.html
register.html
application.properties
test/java/com/example/clinicalolimsa
ClinicalolimsaApplicationTests.java
uploads
.gitattributes
.gitignore
mvnw
mvnw.cmd
pom.xml