#!/bin/bash

mkdir data
for i in {1..5}
do
   curl "https://senator.ect.go.th/api/testquery?province&district&job&tier=0&page=${i}&limit=10000&round=0" > data/${i}.json
done

node district-candidates.js