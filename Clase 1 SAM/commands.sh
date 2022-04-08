#Create the package
sam package --s3-bucket {bucket_name} --template-file template.yaml --output-template-file generated/new-template.yaml --region us-west-1

#Deploy the template to AWS
sam deploy --template-file generated/new-template.yaml --stack-name {stack_name} --region us-west-1 --capabilities CAPABILITY_IAM 