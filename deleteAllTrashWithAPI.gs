/**
 * Other Methods can be used
 * Delete ALL trash emails using Gmail API (Most Effective)
 * Requires enabling Gmail API in Services
 */
function deleteAllTrashWithAPI() {
  try {
    console.log('🗑️ DELETING ALL EMAILS IN TRASH (ANY SENDER)');
    console.log('⚠️ Make sure Gmail API is enabled in Services');
    
    // Check if Gmail API is available
    if (typeof Gmail === 'undefined') {
      console.log('❌ Gmail API not enabled');
      console.log('💡 Enable: Services > Gmail API > Add with identifier "Gmail"');
      return 'Gmail API not enabled';
    }
    
    let totalDeleted = 0;
    let pageToken = null;
    let batchCount = 0;
    
    do {
      batchCount++;
      console.log(`\n📦 Processing batch ${batchCount}...`);
      
      try {
        // Get ALL messages in trash (no sender filter)
        const response = Gmail.Users.Messages.list('me', {
          q: 'in:trash',              // ALL trash emails
          maxResults: 100,
          pageToken: pageToken
        });
        
        if (response.messages && response.messages.length > 0) {
          console.log(`📧 Found ${response.messages.length} messages to delete`);
          
          // Get message IDs
          const messageIds = response.messages.map(msg => msg.id);
          
          try {
            // Batch delete all messages
            Gmail.Users.Messages.batchDelete('me', {
              ids: messageIds
            });
            
            totalDeleted += messageIds.length;
            console.log(`🗑️ PERMANENTLY DELETED ${messageIds.length} messages (total: ${totalDeleted})`);
            
          } catch (batchError) {
            console.log(`❌ Batch delete error: ${batchError.toString()}`);
            
            // Try individual deletion if batch fails
            console.log('🔄 Trying individual deletion...');
            let individualCount = 0;
            
            for (let i = 0; i < Math.min(messageIds.length, 10); i++) {
              try {
                Gmail.Users.Messages.remove('me', messageIds[i]);
                individualCount++;
                Utilities.sleep(200);
              } catch (indError) {
                console.log(`❌ Failed to delete message ${i + 1}`);
              }
            }
            
            totalDeleted += individualCount;
            console.log(`✅ Individually deleted ${individualCount} messages`);
          }
          
          // Rate limiting between batches
          Utilities.sleep(3000);
          
        } else {
          console.log('✅ No more messages in trash');
          break;
        }
        
        pageToken = response.nextPageToken;
        
      } catch (listError) {
        console.log(`❌ Error listing messages: ${listError.toString()}`);
        break;
      }
      
    } while (pageToken && batchCount < 20); // Limit to 20 batches to prevent infinite loops
    
    const summary = `🎉 TRASH DELETION COMPLETE!
📊 Results:
   • Total messages permanently deleted: ${totalDeleted}
   • Batches processed: ${batchCount}
   • Method used: Gmail API batch deletion`;
    
    console.log(summary);
    return summary;
    
  } catch (error) {
    console.log('❌ Error in deleteAllTrashWithAPI: ' + error.toString());
    throw error;
  }
}
