import Immutable from 'immutable';

const notes = Immutable.List(Immutable.Range(1, 100).map(i => {
  return Immutable.Map(
    {
      id: i,
      title: `Note ${i}`,
      body: 'Aute nisi craft beer voluptate, DIY magna VHS quinoa lomo listicle. Pour-over intelligentsia cornhole semiotics nihil gluten-free, incididunt voluptate art party mollit consequat poutine. Tumblr ex cardigan literally, gastropub bespoke health goth. +1 asymmetrical four loko migas, chillwave sriracha excepteur you probably haven\'t heard of them farm-to-table cold-pressed affogato synth tempor yuccie chicharrones. Irure single-origin coffee beard, velit cornhole nisi echo park ethical photo booth chartreuse. Lumbersexual quinoa occupy, tattooed bicycle rights meggings ethical cardigan ullamco. Consectetur polaroid trust fund, squid pitchfork ethical elit hoodie messenger bag 3 wolf moon twee viral nisi vinyl.\nIn cornhole locavore veniam wayfarers disrupt, aliqua selvage seitan aute craft beer four loko accusamus lo-fi. Chia kitsch fap tattooed swag 3 wolf moon tote bag. Flannel skateboard lo-fi gluten-free portland deep v, vinyl kickstarter readymade tattooed tote bag +1 kinfolk you probably haven\'t heard of them. Adipisicing bushwick deserunt, chia cred mollit farm-to-table williamsburg. Banh mi aliquip vero pickled aliqua. Swag bespoke kale chips tilde dreamcatcher. Accusamus freegan wolf marfa you probably haven\'t heard of them, +1 vinyl sunt flexitarian thundercats banh mi adipisicing four loko letterpress pug.'
    })
}))

export default notes;