interface PartProps {
    name: string;
    exerciseCount: number;
}

interface ContentProps {
    parts: PartProps[];
}

const Line = (props: PartProps) => {
    return (
    <p>
        {props.name} {props.exerciseCount}
    </p>
    )
}

const Content = (props: ContentProps) => {
  return (
    props.parts.map((p, idx) => (
        <Line name={p.name} exerciseCount={p.exerciseCount} key={idx}/>
    ))
  )
}

export default Content;