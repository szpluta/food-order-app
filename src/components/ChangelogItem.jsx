function ChangelogItem({ version, codename, children }) {
  return (
    <div className="px-7 pt-5 space-y-5">
      <h3 className="text-2xl font-bold">
        v<span className="text-[var(--accent)]">{version}</span> - {codename}
      </h3>

      {children}
    </div>
  );
}

export default ChangelogItem;
