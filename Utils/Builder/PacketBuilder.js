class PacketBuilder//Server
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
        PacketBuilder.data={}
        return res
    }

}
module.exports=PacketBuilder