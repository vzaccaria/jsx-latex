/** @jsx Reaxt.addNode*/

let Reaxt = require('../../../main');
let _ = require('lodash')


let geometry = [ "margin={2cm, 8cm}", "paper=a4paper" ].join(", ")

let title = { numbered: false, fontname: 'Bebas Neue', fontcolor: '00FF22', fontsize: 2, hrulefill: true }

function addAs(a, key, value) {
    if(!_.isUndefined(value)) {
        return a.concat([{key, value}]);
    } else {
        return a
    }
}

function getOpts(hd) {
    return _.map(hd, (it) => it.key + "=" + it.value);
}


Reaxt.createComponent('picture', (props) => {
    let hd = []
    hd = addAs(hd, "width", _.get(props, "width"));
    hd = getOpts(hd).join(",")
    let ig = `\\includegraphics[${hd}]{${props.src}}`
    return (<node {...props} > {ig} </node>);
})

Reaxt.createComponent('header', (props) => {
    return (
        <overlay>
            <node anchor="north"    to="at (current page.north)" name="bgd" minwidth="\paperwidth" minheight="4cm" fill="gray"> </node>
            <node anchor="south"    to="at (current page.south)" minwidth="\paperwidth" minheight="5cm" fill="gray"> </node>
            <picture anchor="south" to="at (bgd.south)"  src="avatar-vz.jpg" width="1cm" />
            <node    anchor="north" to="at (bgd.center)"  name="ex1" color="white" > cips </node>
            <node    anchor="south" to="at (ex1.north)"  name="ex2" color="white" > example2 </node>

        </overlay>);
})

Reaxt.render(
    <article geometry={geometry} >
        <header />
        <minipage width="4cm" align="t">
            <image src="avatar-vz.jpg" width="1cm" />
        <section title="Prova" style={{title}}>
            This is a prova $x+y$
            This is a prova $x+y$
            This is a prova $x+y$
            This is a prova $x+y$
            This is a prova $x+y$
        </section>
        </minipage>
        <minipage width="10cm" align="t">
        <section title="Prova" style={{title}}>
            This is a prova $x+y$
            This is a prova $x+y$
            This is a prova $x+y$
            This is a prova $x+y$
            This is a prova $x+y$
        </section>
        </minipage>
        <minipage width="2cm">
        <section title="Prova" style={{title}}>
            This is a prova $x+y$
            This is a prova $x+y$
            This is a prova $x+y$
            This is a prova $x+y$
            This is a prova $x+y$
        </section>
        </minipage>
        <section title="Prova" >
            This is a prova

        </section>
        <itemize leftmargin="*" >
                 <item> ciao </item>
                 </itemize>
    </article>
);
