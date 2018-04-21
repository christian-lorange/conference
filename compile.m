data=readtable('upload.xlsx');

s1="<tr class=@content@ ><td class=@sortnr@ style=@display:none;@>";
s2="</td><td class=@tpl@>";
s3="</td><td class=@tpr@>";
s4="</td><td class=@tpr@>";
s5="</td><td class=@middlerow@>";
s6="</td><td class=@middlerow@>";
s7="</td><td class=@bottomrow@><a HREF=@";
s8="@>FOCOMX PAGE</a></td>";
s9="<td class=@bottomrow@><a HREF=@#@>FAVORITES</a></td></tr>";

complete=[];

for i=1:height(data)
    
    artist=strcat(s1,num2str(table2array(data(i,1))),s2,char(table2array(data(i,3))),s3,char(table2array(data(i,6))),s4,char(table2array(data(i,7))),s5,char(table2array(data(i,2))),s6,char(table2array(data(i,4))),s7,char(table2array(data(i,5))),s8,s9);
    
    complete=[complete;artist];
    
end