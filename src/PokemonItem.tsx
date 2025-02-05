interface PokemonItemProps {
  id: number;
  name: string;
  url: string;
}

function PokemonItem(props: PokemonItemProps) {
  return (
    <div className="item">
      #{props.id} {props.name}
      <img className="icon" src={props.url} />
    </div>
  );
}

export default PokemonItem;
