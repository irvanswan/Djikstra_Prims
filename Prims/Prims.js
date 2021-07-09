class Prims {
    constructor(graft, asal) {
        this.vertices = graft.vertical;
        this.adjVertices = graft.adjList;
        this.asal = asal;
        this.isVisited = this.initialization();
        this.minEdges = []
    }

    processPrims(start = this.asal) {
        let long = 0;
        let edges = this.adjVertices[start];
        let to = null;
        if (this.isVisited[start] == false) {
            this.isVisited[start] = true;
            for (const key in edges) {
                if (edges[key] > long && this.isVisited[key] !=true) {
                    long = edges[key]
                    to = key
                }
            }
            if (this.minEdges.length < 1) {
                this.minEdges.push({ start, to, long });
                return this.processPrims(to);
            }
            
            console.log(this.isVisited)
            if(to != null){
                this.minEdges.push({start, to, long});
                return this.processPrims(to);
            }
        }
        return this.minEdges
    }
    initialization() {
        let isVisited = {}
        for (let i = 0; i < this.vertices.length; i++) {
            isVisited[this.vertices[i]] = false
        }
        return isVisited;
    }

    validation(edge, from){
        let temp_short = Infinity;
        let start = edge;
        let edges = this.adjVertices[edge]
        let edges2 = this.adjVertices[from]
        for(const key in edges){
            if(edges[key] < temp_short){
                if(this.isVisited[key] != true){
                    temp_short = edges[key]
                }else{
                    delete edges[key]
                }
            }
            //temp_short = edges[key]
        }
        for(const key in edges2){
            if(edges2[key] < temp_short){
                if(this.isVisited[key] != true){
                    start = from;
                    temp_short = edges2[key]
                }else{
                    delete edges2[key];
                }
            }
        }
        this.adjVertices[edge] = edges;
        this.adjVertices[from] = edges2;
        return start;
    }

}

module.exports = Prims;