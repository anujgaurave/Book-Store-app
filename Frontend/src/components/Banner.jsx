import book from "/book.png";

function Banner() {

    return (
        <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10'>
            <div className='order-2 md:order-1 w-full md:w-1/2 md:mt-32 mt-12'>
                <div className='space-y-8'>
                    <h1 className='text-4xl font-bold'>
                        Hello!! welcome here to learn something
                        <span className='text-pink-500'> new everyday!!!</span>
                    </h1>
                    <p className='text-sm md:text-xl'>
                        “Every book in a bookstore is a fresh beginning. Every book is the next iteration of a very old story. Every bookstore, therefore, is like a safe-deposit box for civilization.” 
                        <span className='text-green-500'>– Liam Callanan</span>
                    </p>
                    <p className='text-sm md:text-xl'>
                        “Bookshops are places of magical discoveries and the rediscovery of past pleasures. My bookshop, in fact any bookshop, makes me very happy.” 
                        <span className='text-green-500'>– Liane Moriarty</span>
                    </p>
                    <p className='text-sm md:text-xl'>
                        “To walk into a modern-day bookstore is a little bit like studying a single photograph out of the infinite number of photographs that could be taken of the world: It offers the reader a frame.” 
                        <span className='text-green-500'>– Nicole Krauss</span>
                    </p>
                    <p className='text-sm md:text-xl'>
                        “Books choose their readers, not the other way around. I believe that booksellers are the matchmakers. Thank you.”
                        <span className='text-green-500'>– Cecelia Ahern</span>
                    </p>
                </div>
            </div>

            <div className='order-1 w-full mt-20 md:w-1/2'>
                <img
                    src={book}
                    className='md:w-[550px] md:h-[460px] md:ml-12 animate-upDown'
                    alt="Book"
                />
            </div>
        </div>
    );
}

export default Banner;
