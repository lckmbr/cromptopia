import Link from "next/link";

const Form = ({ type, post, submitting, setPost, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world and let your imagination
        run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="glassmorphism mt-10 w-full max-w-2xl flex flex-col gap-7"
      >
        <label>
          <span className="font-satoshi text-base text-gray-700 font-semibold">
            Your AI Prompt
          </span>

          <textarea
            className="form_textarea"
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            required
            placeholder="Write your Prompt here..."
          />
        </label>
        <label>
          <span className="font-semibold font-satoshi text-gray-700 text-base">
            Tag
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </span>
          <input
            type="text"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            className="form_input"
            placeholder="#tag"
          />
        </label>
        <div className="flex-end mb-5 gap-4 text-sm">
          <Link href="/" className="text-gray-500">
            Cancel
          </Link>
          <button
            type="submit"
            className="px-5 py-1.5 rounded-full bg-primary-orange text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};
export default Form;
