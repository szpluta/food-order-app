function InfoStatement() {
  return (
    <div className="w-full md:w-3/12 p-5 text-sm text-(--text-h)">
      <h3 className="text-2xl font-bold border-b border-b-(--border) mb-10 p-3.75">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="16px"
        >
          <path
            fill="currentColor"
            d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM224 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-8 64l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"
          />
        </svg>{" "}
        Important Notice
      </h3>

      <p>
        This is only a
        <strong className="text-(--accent)"> demonstration app</strong>.
      </p>
      <ul className="list-disc ps-5 my-3">
        <li>Please do not enter real personal information.</li>
        <li>
          Use fictional delivery addresses and labels (e.g. "Home", "Work").
        </li>
        <li>
          Phone numbers are not stored. A demo number (+48 000 000 000) is used
          instead.
        </li>
        <li>
          Delivery messages are not stored. They are replaced with a default
          message after submission.
        </li>
      </ul>
    </div>
  );
}

export default InfoStatement;
