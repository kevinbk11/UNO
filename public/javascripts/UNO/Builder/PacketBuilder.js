class PacketBuilder//Client
{
    static data = {}
    static addData(key,value)
    {
        PacketBuilder.data[key]=value
        return this
    }
    static build()
    {
        let res = PacketBuilder.data
        this.data={}
        return res
    }
}