
const shell = require('child_process');
const fs = require('fs');

$( "#btn-test1" ).click( (e) => {
    $( "#btn-test1" ).prop('disabled', true);
    $("#rezultati").empty();
    $("#rezultati").append('Radim!!!');
    $("#con1").empty();
    $("#con2").empty();
    
    //const stdout=(m)=>process.stdout.write( m+'\n' )
    //const cmd="cmd.exe /C test1.bat PY1".split(/\s+/)
    const cmd=['python','-u', '-c',"import sys; sys.path.append('py');import t1; t1.f1()"]
    const child=shell.spawn( cmd[0],cmd.slice(1) )
    child.stdout.on( 'data', data=>_fstdout(data ) );
    child.stderr.on( 'data', (data)=> {
        $("#con1").append( data.toString('utf8') );
    });
    child.on("exit", (code) => { 
        setTimeout(()=>{
            $( "#btn-test1" ).prop('disabled', false);  
            $("#rezultati").empty();
            const x1=$("#con1").html().split('\n').length;
            const x2=$("#con2").html().split('\n').length;
            fs.appendFile('tmp/log1.txt', `${x1}, ${x2}\n`,()=>null);
            $("#rezultati").append(x1);
            $("#rezultati").append('<br>');
            $("#rezultati").append(x2);
            //test:
            setTimeout(()=>document.getElementById('btn-test1').dispatchEvent(new MouseEvent('click')),1000);
        },5000)
    });
    
} );

$( "#btn-results" ).click( (e) => {
    $("#rezultati").empty();
    $("#rezultati").append($("#con1").html().split('\n').length)
});
