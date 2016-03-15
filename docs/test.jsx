/** @jsx Reaxt.addNode*/

let Reaxt = require('../main');


let geometry = [ "margin={2cm, 2cm}", "paper=a4paper" ].join(", ");

let title ={
    numbered: false,
    fontname: 'Bebas Neue',
    fontcolor: '888888',
    fontsize: 2
};

Reaxt.render(
    <article geometry={geometry} >
        <minipage width="4cm" align="t">
            <image src="avatar-vz.jpg" width="1cm" />
            <minipage width="2.9cm">
            <section title="Foo" style={{title}}>
                <itemize leftmargin="*" >
                    <item> foo </item>
                    <item> bar </item>
                </itemize>
            </section>
            </minipage>
        </minipage>
    </article>
);
