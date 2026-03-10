import type { CoursePart } from "../types";

interface PartProps {
    part: CoursePart;
}

interface ContentProps {
    parts: CoursePart[];
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: PartProps) => {

    const render = (part: CoursePart) => {
        switch (part.kind) {
            case 'basic':
                return (
                    <p>
                        <strong>{part.name} {part.exerciseCount}</strong>
                        <br/>
                        <i>{part.description}</i>
                    </p>
                        )
                
            case 'group':
                return (
                    <p>
                        <strong>{part.name} {part.exerciseCount}</strong>
                        <br/>
                        project exercises {part.groupProjectCount}
                    </p>
                        )
            case 'background':
                return (
                    <p>
                        <strong>{part.name} {part.exerciseCount}</strong>                         
                        <br/>
                        <i>{part.description}</i>
                        <br/>
                        submit to {part.backgroundMaterial}
                    </p>
                        )
            case 'special':
                return (
                    <p>
                        <strong>{part.name} {part.exerciseCount}</strong>                         
                        <br/>
                        <i>{part.description}</i>
                        <br/>
                        required skills: {part.requirements.join(', ')}
                    </p>
                        )
            default:
                 return assertNever(part);    
        }
    }
    return (render(props.part))
}

const Content = (props: ContentProps) => {
  return (
    props.parts.map((p) => (
        <Part part={p} key={p.name}/>
    ))
  )
}

export default Content;