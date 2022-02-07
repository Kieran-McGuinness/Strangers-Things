const { REACT_APP_BASE_URL } = process.env;

export const callApi = async ({ url, method, token, body }) => {
  // console.log({ url, method, token, body })
  try {

    const options = {
      method: method ? method.toUpperCase() : 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    // console.log('request url: ', REACT_APP_BASE_URL + url)
    // console.log('options: ', options);
    const response = await fetch(REACT_APP_BASE_URL + url, options);
    const data = await response.json();
    // console.log('data: ', data);
    if (data.error) throw data.error;
    console.log(data)
    return data;
  } catch (error) {
    console.error('ERROR: ', error);
    return error
  }
}


// Below are original fetch commands before using single above command
// saved for future reference
// +++++++++++++++++++

// export async function getPosts() {
//     try {
//       const response =  localStorage.getItem("myToken")
//       ? 
//       await fetch(`${API}/posts`, {
//         headers: {
//           'Content-Type': 'application/json',
//        'Authorization': `Bearer ${localStorage.getItem("myToken")}`
//         }
//       })
//       :
//       await fetch(`${API}/posts`)
//       ;
//       const result = await response.json();
//       // console.log(result)
//       return result;
//     } catch (error) {
//       throw error;
//     }
//   }


// export async function registerNew (regInfo) {
//   try{
//     const response = await fetch(`${API}/users/register`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(
//         regInfo
//         ),
//     }
//     );
//     const result = await response.json();
//     console.log(result);
//   } catch (error){
//     console.error('could not register', error)
//   }
// };

//   export function loginUser (loginInfo){
//   return fetch(`${API}/users/login`,{
//      method: 'POST',
//      headers: {
//        'Content-Type': 'application/json'
//      },
//      body: JSON.stringify
//      (
//        loginInfo
//        ),
//    }
//    ).then(response => response.json())
//    .then(result =>{
//      result.data.token ? localStorage.setItem("myToken", result.data.token): console.log(result);
//      console.log(result)
//      return result;
//    }).catch(console.error);
//  }


//  export function createPost (postInfo){
//   return fetch(`${API}/posts`,{
//      method: 'POST',
//      headers: {
//        'Content-Type': 'application/json',
//        'Authorization': `Bearer ${localStorage.getItem("myToken")}`
//      },
//      body: JSON.stringify
//      (
//        postInfo
//        ),
//    }
//    ).then(response => response.json())
//    .then(result =>{
//      console.log(result)
//      return result;
//    }).catch(console.error);
//  }


//  export async function deletePost(postId) {
//   try {
//     const response =  await fetch(`${API}/posts/${postId}`, {
//       method:  'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//      'Authorization': `Bearer ${localStorage.getItem("myToken")}`
//       }
//     })
//     ;
//     const result = await response.json();
//     console.log(result)
//     return result;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function getMe() {
//   try {
//     const response =  localStorage.getItem("myToken")
//     ? 
//     await fetch(`${API}/users/me`, {
//       headers: {
//         'Content-Type': 'application/json',
//      'Authorization': `Bearer ${localStorage.getItem("myToken")}`
//       }
//     })
//     :
//     await fetch(`${API}/users/me`)
//     ;
//     const result = await response.json();
//     // console.log(result)
//     return result;
//   } catch (error) {
//     throw error;
//   }
// }


// export async function sendMessage (messageInfo, postId) {
//   try{
//     const response = await fetch(`${API}/posts/${postId}/messages`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem("myToken")}`
//       },
//       body: JSON.stringify(
//         messageInfo
//         ),
//     }
//     );
//     const result = await response.json();
//     return results
//     console.log(result);
//   } catch (error){
//     console.error('could not send message', error)
//   }
// };

// export async function getIndvPosts(id) {
//   try {
//     const response = localStorage.getItem("myToken")
//       ?
//       await fetch(`${API}/posts/${id}`, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem("myToken")}`
//         }
//       })
//       :
//       await fetch(`${API}/posts`)
//       ;
//     const result = await response.json();
//     // console.log(result)
//     return result;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function editPosts(info, id) {
//   try {
//     const response =  await fetch(`${API}/posts/${id}`, {
//       method: "PATCH",
//       headers: {
//         'Content-Type': 'application/json',
//      'Authorization': `Bearer ${localStorage.getItem("myToken")}`
//       },
//       body: JSON.stringify(
//         info
//       )
//     });
//     const result = await response.json();
//     console.log(result)
//     return result;
//   } catch (error) {
//     throw error;
//   }
// }




