class Djikstra {
    constructor(graft, asal, tujuan) {
        this.vertices = graft.vertical;
        this.adjVertices = graft.adjList;
        this.asal = asal;
        this.tujuan = tujuan;
    }
    
    processDjikstra() {
        let initialization = this.initialization(this.asal);
        let { dist, isVisited, verticePathFrom } = initialization
        // dan set node awal sebagai “Node keberangkatan”
        let currentVisited = this.asal;

        while(currentVisited !== null){
            // Dari no keberangkatan, pertimbangkan node tetangga yang belum terjamah
            let edges = this.adjVertices[currentVisited]
            let distance = dist[currentVisited]
            console.log('1',edges, distance)
            for (const key in edges) {
                // hitung jaraknya dari titik keberangkatan
                let newDistance = distance + edges[key]
                //Jika jarak ini lebih kecil dari jarak sebelumnya (yang telah terekam sebelumnya) hapus data lama, simpan ulang data jarak dengan jarak yang baru.
                if(newDistance < dist[key]){
                    dist[key] = newDistance
                    verticePathFrom[key] = currentVisited
                }
            }
            //Saat kita selesai mempertimbangkan setiap jarak terhadap node tetangga, tandai node yang telah terjamah sebagai “Node terjamah”. Node terjamah tidak akan pernah di cek kembali, jarak yang disimpan adalah jarak terakhir dan yang paling minimal bobotnya.
            isVisited[currentVisited] = true;
            
            let minDistance = Infinity
            let currVertice = null
            for (const key in dist) {
                if (dist[key] < minDistance && isVisited[key] !== true) {
                  minDistance = dist[key]
                  currVertice = key
                }
              }
        
            currentVisited = currVertice
        }
        return {dist : dist, verticePathFrom : verticePathFrom, isVisited : isVisited}
    }

    initialization(from) {
        let dist = {}
        let isVisited = {}
        let verticePathFrom = {}
        //Beri nilai bobot (jarak) untuk setiap titik ke titik lainnya, lalu set nilai 0 pada node awal dan nilai tak hingga terhadap node lain (belum terisi)
        for (let i = 0; i < this.vertices.length; i++) {
            if (this.vertices[i] === from) {
                dist[this.vertices[i]] = 0
            } else {
                dist[this.vertices[i]] = Infinity
            }
            verticePathFrom[this.vertices[i]] = this.vertices[i]
            //Set semua node “Belum Terjamah”
            isVisited[this.vertices[i]] = false
        }
        return { dist: dist, isVisited: isVisited , verticePathFrom : verticePathFrom}
    }
}

module.exports = Djikstra