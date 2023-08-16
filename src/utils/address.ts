import { firebaseApp, storage } from '@/api/FirebaseApi'

export function getLocation() {
  if (navigator.geolocation) {
    let data = {}
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      data = { latitude, longitude }
    })
    return data
  } else {
    return null
  }
}

export async function getCities(city: number) {
  let addressStore = JSON.parse(localStorage.getItem('address') as string)
  if (localStorage.getItem('address') && addressStore[city]) {
    const request = new Request(addressStore[city], { cache: 'force-cache' })
    return await caches.match(request.url).then(async (cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse.json().then((data) => data)
      } else {
        return await fetch(request).then((response) => {
          if (response.ok) {
            caches.open(request.url).then(async (cache) => {
              await cache.put(request.url, await response.clone()) // Yanıtı önbelleğe ekle
            })
            return response.json()
          }
        })
      }
    })
  } else {
    const file = city == 0 ? '/cities/cities.json' : 'cities/' + city + '.json'
    const fileRef = await storage.ref(storage.getStorage(firebaseApp), file.toString())
    const url = await storage.getDownloadURL(fileRef)
    const request = await new Request(url, { cache: 'force-cache' })
    return await fetch(request).then(async (response) => {
      if (response.ok) {
        await caches.open(request.url).then(async (cache) => {
          await cache.put(request.url, await response.clone()) // Yanıtı önbelleğe ekle
        })
        if (addressStore == null) {
          addressStore = []
        }
        addressStore[city] = request.url

        localStorage.setItem('address', JSON.stringify(addressStore))

        return response.json()
      }
    })
  }
}
