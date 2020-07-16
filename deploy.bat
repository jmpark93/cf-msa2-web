call npm run build

mkdir dist\public

move dist\* dist\public\

move dist\css dist\public 
move dist\img dist\public 
move dist\js dist\public 

copy conf\* dist\

cf push
