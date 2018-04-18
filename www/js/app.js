$(function() {
   function moveRow(row, targetTable, newLinkText){
       $(row)
           .appendTo(targetTable)
           .find("A")
               .text(newLinkText);
   }
   
   $("#FIRST A").live("click", function(){
       moveRow($(this).parents("tr"), $("#SECOND"), "Add");
   });

   $("#SECOND A").live("click", function(){
       moveRow($(this).parents("tr"), $("#FIRST"), "Delete");
   });
   $('#FIRST A,#SECOND A').live('click', function() {
     localStorage.setItem('FIRST',$('#FIRST').html());
     localStorage.setItem('SECOND',$('#SECOND').html());
   });
   var first = localStorage.getItem('FIRST');
   var second = localStorage.getItem('SECOND');
   !first || $('#FIRST').html(first);
   !second || $('#SECOND').html(second);
});