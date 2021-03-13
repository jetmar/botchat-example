#!/usr/bin/env sh
if [ -e $1 ]; then
  i=1
  pid=""
  echo "el archivo ya existe"
  while read line; do
    pid=$line
    i=$((i+1))
  done < $1
  echo "se matara el proceso id:\n $pid"
  kill -9 $pid
  sleep 3
  rm $1	
fi
PID="123"
node ./bin/www &
PID=$!
echo "aplicacion node desplegada $PID"
echo $PID > $1
exit