import React from 'react';

const Btn = (props) => {
    console.log(props.title,props.color,);

    return (
        <>
                <button>Edit</button>
        </>
    );
}

export default Btn;

// or
// import React from 'react';

// const Btn = ({ title, color, text }) => {
//     console.log(title, color, text);

//     return (
//         <>
//                 <button  className={`${color} ${text}`}>
//                         {title}
//                 </button>
//         </>
//     );
// }

// export default Btn;
