export function PipelineRow({ nodes }: { nodes: readonly string[] }) {
  return (
    <div className="case-pipeline">
      <p className="eyebrow">Architecture overview</p>
      <ol>
        {nodes.map((node) => (
          <li key={node}>{node}</li>
        ))}
      </ol>
    </div>
  );
}
