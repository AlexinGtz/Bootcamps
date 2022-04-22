### Permite crear un nuevo proyecto a base de una plantilla
`sam init`

### Permite lanzar una API localmente con SAM
##### (Se necesita Docker instalado)

`sam local start-api --port {port}`

### Permite crear una nueva pipeline con guia

`sam pipeline init --bootstrap`

### Permite hacer un paquete y subirlo a S3, para que pueda ser deployeado
`sam package --s3-bucket {bucket_name} --template-file {template_path} --output-template-file {output_path} --region {region}`

### Permite hacer un deploy desde la linea de comandos
`sam deploy --template-file {template_path} --stack-name {stack_name} --region {region} --capabilities CAPABILITY_IAM `