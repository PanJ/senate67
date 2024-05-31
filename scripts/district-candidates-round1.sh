#!/bin/bash

mkdir data
for i in {1560..1606}
do
   curl "https://senator.ect.go.th/api/senator?province&district&job&tier=1&page=${i}&limit=20&round=1" > data/round1-${i}.json
done

# node district-candidates-round1.js