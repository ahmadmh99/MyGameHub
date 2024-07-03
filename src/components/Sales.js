import React, { useState, useEffect } from 'react';
import './Sales.css';
import Navigation from './Navigation';
import Footer from './Footer';
import { Button, Modal, Badge } from 'react-bootstrap';

export const products = [
  {
    id: 1,
    name: "Assassin's Creed ",
    price: 79.99,
    discount: 10,
    releasedate: "October 5, 2023",
    descreption:"In Assassin's Creed Mirage, you are Basim, a cunning street thief with nightmarish visions seeking answers and justice. Join an ancient organisation and come to understand a new creed – one that will change Basim's fate in ways he never could have imagined.",
    imgSrc: 'https://exongames.co.il/cdn/shop/products/EXON-AssassinsCreedMirage-StandardEdition-Cover.jpg?v=1686151836&width=900',
  },
  {
    id: 2,
    name: 'Grand Theft Auto V',
    price: 29.99,
    discount: 5,
    releasedate:"September 17, 2013" ,
    descreption:"The story is about three protagonists: retired bank robber Michael De Santa, street gangster Franklin Clinton, and drug dealer and gunrunner Trevor Philips. They attempts to commit robberies while under pressure from a corrupt government agency and powerful criminals.",
    imgSrc: 'https://exongames.co.il/cdn/shop/products/grand-theft-auto-v-or-gta-5-standard-edition-exon-1.jpg?v=1666120281&width=600',
  },
  {
    id: 3,
    name: 'EA SPORTS FC™ 24',
    price: 89.99,
    discount: 20,
    releasedate:"September 29, 2023" ,
    descreption:"EA SPORTS FC™ 24 welcomes you to The World's Game: the most true-to-football experience ever with HyperMotionV, PlayStyles optimised by Opta, and an enhanced Frostbite™ Engine.",
    imgSrc: 'https://exongames.co.il/cdn/shop/files/EXON-EASportsFC24-StandardEdition-Cover_15b76566-200e-4e7e-9427-f05731180360.jpg?v=1689344171&width=1000',
  },
  {
    id: 1,
    name: 'Red Dead  2',
    price: 29.99,
    discount: 20,
    releasedate:"October 26, 2018" ,
    descreption:"After a robbery goes badly wrong in the western town of Blackwater, Arthur Morgan and the Van der Linde gang are forced to flee. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive.",
    imgSrc: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTJGm-_E6Q1gD0HmglrtSEl1cWIyla1iCgHeRq9UPSwFnuvR_T3',
  }, {
    id: 2,
    name: 'The Last of Us',
    price: 39.99,
    discount: 20,
    releasedate:"January 15, 2023" ,
    descreption:"The Last of Us is a post-apocalyptic zombie game that tells an intimate story while also having an epic storyline. ",
    imgSrc: 'https://assets2.ignimgs.com/2015/09/14/the-last-of-us-generic-button-0jpg-995e90.jpg',
  },
  {
    id: 3,
    name: 'God of War Ragnarök',
    price: 79.99,
    discount: 20,
    releasedate:"November 9, 2022" ,
    descreption:"God of War Ragnarok is the next chapter in the story of Kratos and his growing son Atreus as they prepare for the titular cataclysm that threatens to be unleashed upon not just the Norse lands of Midgard, but all of the nine realms.",
    imgSrc: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png',
  },
  {
    id: 1,
    name: 'Call of Duty',
    price: 99.99,
    discount: 20,
    releasedate:"November 10, 2023" ,
    descreption:"Call of Duty®: Modern Warfare® II, Captain Price and Task Force 141 face off against the ultimate threat. The ultranationalist war criminal Vladimir Makarov is extending his grasp across the world causing Task Force 141 to fight like never before.",
    imgSrc: 'https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mwiii/MWIII-REVEAL-FULL-TOUT.jpg',
  },
  {
    id: 2,
    name: 'Battlefield 2042',
    price: 49.99,
    discount: 20,
    releasedate:"October 6, 2021" ,
    descreption:"Battlefield 2042 marks the return to the iconic all-out warfare of the franchise. Adapt and overcome dynamically-changing battlegrounds with the help of your squad and a cutting-edge arsenal. ",
    imgSrc: 'https://images.g2a.com/360x600/1x1x1/battlefield-2042-pc-steam-account-account-global-i10000255724059/7a882745aa1a482892ad2aa7',
  },
  {
    id: 3,
    name: 'Spider-Man',
    price: 69.99,
    discount: 20,
    releasedate:"October 20, 2023" ,
    descreption:"Peter Parker is beset with troubles in his failing personal life as he battles a former brilliant scientist named Otto Octavius.",
    imgSrc: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Spider-Man_PS4_cover.jpg/220px-Spider-Man_PS4_cover.jpg',
  },
  {
    id: 1,
    name: 'Minecraft',
    price: 9.99,
    discount: 20,
    releasedate:"November 18, 2011",
    descreption:"Minecraft is a game where players place blocks and go on adventures. This includes anything from crafting simple items like containers or weapons, to building structures like houses, castles, and cities, or even making complex mechanical devices, all within the game's world.", 
    imgSrc: 'https://exongames.co.il/cdn/shop/products/minecraft-java-edition-exon-1_0e02a3dc-6bef-4c54-bdec-9d475851a8ee.jpg?v=1666127289&width=900',
  }, {
    id: 2,
    name: 'Forza Horizon 5 ',
    price: 39.99,
    discount: 20,
    releasedate:"November 5, 2021" ,
    descreption:"Forza Horizon 5 is a racing video game set in an open world environment based in a fictional representation of Mexico." ,
    imgSrc: 'https://exongames.co.il/cdn/shop/products/forza-horizon-5-standard-edition-exon-1.jpg?v=1639669199&width=1000',
  }, {
    id: 3,
    name: 'Mortal Kombat 11',
    price: 29.99,
    discount: 20,
    releasedate:"April 23, 2019" ,
    descreption:"Mortal Kombat is back and better than ever in the eleventh evolution of the iconic franchise. MK11 features a roster of new and returning Klassic Fighters engaged in deadly brawls and a cinematic story mode." ,
    imgSrc: 'https://cdn.shopify.com/s/files/1/0526/0663/2093/products/mortal-kombat-11-standard-edition-exon-1.jpg?v=1639670617&width=300',
  },
];

const Sales = () => {
  const [sortedProducts, setSortedProducts] = useState([...products]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedGame, setSelectedGame] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const handleSort = () => {
      const sorted = [...products].sort((a, b) => {
        const discountedPriceA = Math.trunc((a.price * (70)) / 100);
        const discountedPriceB = Math.trunc((b.price * (70)) / 100);

        if (sortOrder === 'asc') {
          return discountedPriceA - discountedPriceB;
        } else {
          return discountedPriceB - discountedPriceA;
        }
      });

      setSortedProducts(sorted);
    };

    handleSort();
  }, [sortOrder]);

  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleIncrement = (game) => {
    const existingItem = cartItems.find((item) => item.id === game.id);
  
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === game.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prevItems) => [
        ...prevItems,
        {
          id: game.id,
          name: game.name,
          price: game.price,
          discount: game.discount,
          quantity: 1,
        },
      ]);
    }
  
    // Display styled alert in the center of the page
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('styled-alert');
    alertDiv.textContent = 'Item added to cart!';
    document.body.appendChild(alertDiv);
    setTimeout(() => {
      alertDiv.remove(); // Remove alert after 2 seconds
    }, 2000);
  };
  const handleMoreInfo = (game) => {
    setSelectedGame(game);
   
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  return (
    <div className="sales">
      <Navigation />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
      <div className="product-list-sentence">
  Product List - Explore Our Latest Deals
</div>
<button className="sort-button" onClick={handleSortToggle}>
  Sort by most Discounted Price game {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
</button>
      </div>
      <br></br>
      <main>
        {sortedProducts.map((game) => (
          <section key={game.id} className="game-container">
            <div className="game-card">
              <img src={game.imgSrc} alt={game.name} />
              <h2>{game.name}</h2>
              <p>
                <span className="old-price">₪{game.price}</span>
                <span className="new-price">
                  ₪{Math.trunc((game.price * (70)) / 100)}
                </span>{' '}
                <div>
                  <Button onClick={() => handleIncrement(game)}>Add to Cart</Button>
                  <Button onClick={() => handleMoreInfo(game)}>More Info</Button>
                </div>
              </p>
            </div>
          </section>
        ))}
      </main>

      <Footer />

      <Modal show={selectedGame !== null} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedGame?.name} - More Info</Modal.Title>
        </Modal.Header>
        <Modal.Body> <p>
            Game Name: {selectedGame?.name}
          </p>
      
          <p>Release Date: {selectedGame?.releasedate}</p>
          <p>Description: {selectedGame?.descreption}</p>
              <p>
            Discounted Price: ₪{Math.trunc((selectedGame?.price * (70)) / 100)}
          </p>
          
          <p>Discount: {selectedGame?.discount}%</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="cart">
        <h2>Shopping Cart</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <p>
              {item.name} - Quantity: {item.quantity} - ₪{item.price} (each) -{' '}
              Total: ₪{item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sales;