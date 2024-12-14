// import React, { createContext, useState, useContext, useEffect } from "react";

// const UserContext = createContext();

// export const useUser = () => useContext(UserContext);

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem("user"));
//     if (savedUser) {
//       setUser(savedUser);
//     }
//   }, []);

//   const login = (userData) => {
//     const userWithCart = { ...userData, cart: [] };
//     setUser(userWithCart);
//     localStorage.setItem("user", JSON.stringify(userWithCart));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   const addToCart = (product) => {
//     setUser((prevUser) => {
//       if (!prevUser) return null;
//       const updatedCart = prevUser.cart ? [...prevUser.cart] : [];
//       const existingItem = updatedCart.find((item) => item.id === product.id);

//       if (existingItem) {
//         const newCart = updatedCart.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//         const updatedUser = { ...prevUser, cart: newCart };
//         localStorage.setItem("user", JSON.stringify(updatedUser));
//         return updatedUser;
//       } else {
//         const newCart = [...updatedCart, { ...product, quantity: 1 }];
//         const updatedUser = { ...prevUser, cart: newCart };
//         localStorage.setItem("user", JSON.stringify(updatedUser));
//         return updatedUser;
//       }
//     });
//   };

//   const removeFromCart = (productId) => {
//     setUser((prevUser) => {
//       if (!prevUser) return null;
//       const newCart = prevUser.cart.filter((item) => item.id !== productId);
//       const updatedUser = { ...prevUser, cart: newCart };
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       return updatedUser;
//     });
//   };

//   const updateQuantity = (productId, quantity) => {
//     setUser((prevUser) => {
//       if (!prevUser) return null;
//       const newCart = prevUser.cart.map((item) =>
//         item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
//       ).filter((item) => item.quantity > 0);
//       const updatedUser = { ...prevUser, cart: newCart };
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       return updatedUser;
//     });
//   };

//   const clearCart = () => {
//     setUser((prevUser) => {
//       if (!prevUser) return null;
//       const updatedUser = { ...prevUser, cart: [] };
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       return updatedUser;
//     });
//   };

//   const getTotalPrice = () => {
//     return user && user.cart
//       ? user.cart.reduce((total, item) => total + item.price * item.quantity, 0)
//       : 0;
//   };

//   return (
//     <UserContext.Provider value={{ user, login, logout, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// import React, { createContext, useState, useContext, useEffect } from "react";

// const UserContext = createContext();

// export const useUser = () => useContext(UserContext);

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem("user"));
//     if (savedUser) {
//       setUser(savedUser);
//     }
//   }, []);

//   const login = (userData) => {
//     const userWithCart = { ...userData, cart: [] };
//     setUser(userWithCart);
//     localStorage.setItem("user", JSON.stringify(userWithCart));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   const addToCart = (product) => {
//     setUser((prevUser) => {
//       if (!prevUser) return null;
//       const updatedCart = prevUser.cart ? [...prevUser.cart] : [];
//       const existingItem = updatedCart.find((item) => item.id === product.id);

//       if (existingItem) {
//         const newCart = updatedCart.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//         const updatedUser = { ...prevUser, cart: newCart };
//         localStorage.setItem("user", JSON.stringify(updatedUser));
//         return updatedUser;
//       } else {
//         const newCart = [...updatedCart, { ...product, quantity: 1 }];
//         const updatedUser = { ...prevUser, cart: newCart };
//         localStorage.setItem("user", JSON.stringify(updatedUser));
//         return updatedUser;
//       }
//     });
//   };

//   const removeFromCart = (productId) => {
//     setUser((prevUser) => {
//       if (!prevUser) return null;
//       const newCart = prevUser.cart.filter((item) => item.id !== productId);
//       const updatedUser = { ...prevUser, cart: newCart };
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       return updatedUser;
//     });
//   };

//   const updateQuantity = (productId, quantity) => {
//     setUser((prevUser) => {
//       if (!prevUser) return null;
//       const newCart = prevUser.cart.map((item) =>
//         item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
//       ).filter((item) => item.quantity > 0);
//       const updatedUser = { ...prevUser, cart: newCart };
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       return updatedUser;
//     });
//   };

//   const clearCart = () => {
//     setUser((prevUser) => {
//       if (!prevUser) return null;
//       const updatedUser = { ...prevUser, cart: [] };
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       return updatedUser;
//     });
//   };

//   const getTotalPrice = () => {
//     return user && user.cart
//       ? user.cart.reduce((total, item) => total + item.price * item.quantity, 0)
//       : 0;
//   };

//   const getCartItemsCount = () => {
//     return user && user.cart
//       ? user.cart.reduce((total, item) => total + item.quantity, 0)
//       : 0;
//   };

//   return (
//     <UserContext.Provider value={{
//       user,
//       login,
//       logout,
//       addToCart,
//       removeFromCart,
//       updateQuantity,
//       clearCart,
//       getTotalPrice,
//       getCartItemsCount
//     }}>
//       {children}
//     </UserContext.Provider>
//   );
// };


import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = (userData) => {
    const userWithCart = { ...userData, cart: [] };
    setUser(userWithCart);
    localStorage.setItem("user", JSON.stringify(userWithCart));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const addToCart = (product) => {
    setUser((prevUser) => {
      if (!prevUser) {
        const newUser = { cart: [{ ...product, quantity: 1 }] };
        localStorage.setItem("user", JSON.stringify(newUser));
        return newUser;
      }

      const updatedCart = prevUser.cart ? [...prevUser.cart] : [];
      const existingItem = updatedCart.find((item) => item.id === product.id);

      if (existingItem) {
        const newCart = updatedCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        const updatedUser = { ...prevUser, cart: newCart };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      } else {
        const newCart = [...updatedCart, { ...product, quantity: 1 }];
        const updatedUser = { ...prevUser, cart: newCart };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      }
    });
  };

  const removeFromCart = (productId) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const newCart = prevUser.cart.filter((item) => item.id !== productId);
      const updatedUser = { ...prevUser, cart: newCart };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const updateQuantity = (productId, quantity) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const newCart = prevUser.cart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter((item) => item.quantity > 0);
      const updatedUser = { ...prevUser, cart: newCart };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const clearCart = () => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const updatedUser = { ...prevUser, cart: [] };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const getTotalPrice = () => {
    return user && user.cart
      ? user.cart.reduce((total, item) => total + item.price * item.quantity, 0)
      : 0;
  };

  const getCartItemsCount = () => {
    return user && user.cart
      ? user.cart.reduce((total, item) => total + item.quantity, 0)
      : 0;
  };

  return (
    <UserContext.Provider value={{
      user,
      login,
      logout,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getCartItemsCount
    }}>
      {children}
    </UserContext.Provider>
  );
};

