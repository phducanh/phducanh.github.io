import descriptionData from '../../data/description.json';

const Description = () => {
    return (
        <>
            <p>
                {descriptionData.mainText}{' '}
                {descriptionData.links.map((link, index) => (
                    <>
                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="external-link"
                        >
                            {link.text}
                        </a>
                        {index < descriptionData.links.length - 1 ? ', a ' : ' '}
                    </>
                ))}
                {descriptionData.additionalText}{' '}
                {descriptionData.platformLinks.map((link, index) => (
                    <>
                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="external-link"
                        >
                            {link.text}
                        </a>
                        {index < descriptionData.platformLinks.length - 1 ? ' blog hosted on ' : '.'}
                    </>
                ))}
            </p>
            <p>
                My blog:{' '}
                <a
                    href={descriptionData.blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="external-link"
                >
                    {descriptionData.blog.text}
                </a>
            </p>
        </>
    );
};

export default Description; 