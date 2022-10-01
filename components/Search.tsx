import {useState} from 'react'
import Results from './Results'

/**
 * Search component.
 */
export default function Search() {
  const [inputValue, setValue] = useState('itookapicture')
  const [sort, setSort] = useState('hot')
  const [subreddit, setSubreddit] = useState(inputValue)
  const [toggleHelp, setToggleHelp] = useState(false)

  function helpToggler() {
    setToggleHelp((prev) => !prev)
  }

  function handleSearch(event) {
    event.preventDefault()
    setSubreddit(inputValue)
  }

  function handleSort(event) {
    event.preventDefault()
    setSort(event.target.value)
  }

  return (
    <>
      <form
        className="m-auto max-w-lg text-center text-lg"
        onSubmit={handleSearch}
      >
        <div className="flex">
          <span className="mr-1 self-center">r/</span>
          <input
            autoCapitalize="none"
            className="w-full rounded-none border-t border-l border-b p-2 focus:outline-none"
            id="search"
            minLength={2}
            onChange={(e) => setValue(e.target.value.trim())}
            pattern="^[^~`^<>]+$"
            placeholder="pics"
            type="text"
            value={inputValue}
          />
          <select id="search" name="search" onChange={handleSort} value={sort}>
            <option value="hot">hot</option>
            <option value="top">top</option>
            <option value="new">new</option>
            <option value="best">best</option>
            <option value="rising">rising</option>
          </select>
          <button className="border py-2 px-4">Search</button>
        </div>
        <label htmlFor="search" className="text-sm italic">
          Type the name of a subreddit and press enter.{' '}
          <button onClick={helpToggler}>
            Help <span className="text-lg leading-none">&#9662;</span>
          </button>
          {toggleHelp && (
            <p className="text-md mt-2 not-italic">
              You can also combine subreddits. For example:{' '}
              <span className="font-mono tracking-wide">
                all+popular+funny+aww+pics
              </span>
            </p>
          )}
        </label>
      </form>
      <main className="min-h-screen">
        <Results subreddit={subreddit} sortBy={sort} />
      </main>
    </>
  )
}