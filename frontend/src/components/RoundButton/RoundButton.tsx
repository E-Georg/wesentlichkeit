// import { useEffect, useState } from 'react';

// type Props = {
//   relevance: number;
// };

// function RoundButton({ relevance }: Props) {
//   const getColor = (relevance: number) => {
//     switch (relevance) {
//       case 1:
//         return 'green';
//       case 2:
//         return 'red';
//       default:
//         return 'yellow';
//     }
//   };
//   const [color, setColor] = useState(getColor(relevance));

//   useEffect(() => {
//     setColor(getColor(relevance));
//   }, [relevance]);

//   const style = {
//     backgroundColor: color,
//     border: 'none',
//     borderRadius: '50%',
//     width: '10px',
//     height: '10px',
//     cursor: 'pointer',
//   };

//   return <button style={style}></button>;
// }

// export default RoundButton;
import { useEffect, useState } from 'react';

type Props = {
  relevance: number;
};

function RoundButton({ relevance }: Props) {
  const getColor = (relevance: number) => {
    switch (relevance) {
      case 1:
        return 'green';
      case 2:
        return 'red';
      default:
        return 'yellow';
    }
  };

  const [color, setColor] = useState(getColor(relevance));
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setColor(getColor(relevance));
  }, [relevance]);

  const style: any = {
    backgroundColor: color,
    border: 'none',
    borderRadius: '50%',
    width: '10px',
    height: '10px',
    cursor: 'default',
    position: 'relative',
  };

  const tooltipStyle: any = {
    display: hover ? 'display' : 'none',
    position: 'absolute',
    top: '-40px',
    left: '30%',
    transform: 'translateX(-50%)',
    backgroundColor: 'black',
    color: 'white',
    padding: '5px',
    borderRadius: '3px',
    fontSize: '12px',
    whiteSpace: 'nowrap',
  };

  const handleClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const colorStyle = (bgColor: any) => ({
    width: '10px',
    height: '10px',
    backgroundColor: bgColor,
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '5px',
  });

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button style={style} onClick={handleClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {hover && (
          <div style={tooltipStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={colorStyle('green')}></div>
              <p style={{ textDecoration: 'none', marginRight: '5px' }}>Relevant</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={colorStyle('red')}></div>
              <p style={{ marginRight: '5px' }}>Not Relevant</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={colorStyle('yellow')}></div>
              <p style={{ textDecoration: 'none', marginRight: '5px' }}>Not defined</p>
            </div>
          </div>
        )}
      </button>
    </div>
  );
}

export default RoundButton;
