interface PokemonItemProps {
  id?: number;
  name: string;
  url?: string;
}

function PokemonItem(props: PokemonItemProps) {
  return (
    <div className="item">
      #{props.id ?? '-'} {props.name}
      {props.url ? (
        <img className="icon" src={props.url} />
      ) : (
        <div className="icon" />
      )}
    </div>
  );
}

export default PokemonItem;
