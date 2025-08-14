export async function getAlbums() {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/albums?userId=1'
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch to-do list: ${response.statusText}`);
    }

    const todos = response.json();
    return todos;
  } catch (error) {
    console.error('Error fetching to-do list', error);
    return [];
  }
}
